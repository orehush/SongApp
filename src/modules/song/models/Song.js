import {getParent, resolveIdentifier, types} from 'mobx-state-tree';
import Songbook from 'modules/songbook/models/Songbook';

const Paragraph = types.model('Paragraph', {
  text: types.string,
  searchText: types.string,
  type: types.enumeration(['text', 'refrain']),
});

export default types
  .model('Song', {
    id: types.identifierNumber,
    number: types.number,
    title: types.string,
    songbookId: types.number,
    paragraphs: types.array(Paragraph),

    bookmarkedDate: types.maybeNull(types.Date),
    openCounts: types.optional(types.number, 0),
  })
  .views(self => ({
    get songbook() {
      const parent = getParent(self, 2);
      return resolveIdentifier(Songbook, parent.songbooks, self.songbookId);
    },
    get isBookmarked() {
      return !!self.bookmarkedDate;
    },
  }))
  .actions(self => ({
    track() {
      const parent = getParent(self, 2);
      parent.history.track(self);
      self.openCounts += 1;
    },
    addBookmark() {
      self.bookmarkedDate = new Date();
    },
    removeBookmark() {
      self.bookmarkedDate = null;
    },
  }));
