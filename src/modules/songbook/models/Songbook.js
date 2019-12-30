import {getParent, types} from 'mobx-state-tree';

export default types
  .model('Songbook', {
    id: types.identifierNumber,
    title: types.string,
    description: types.optional(types.string, ''),
  })
  .views(self => ({
    get songs() {
      const parent = getParent(self, 2);
      return parent.songs.filter(song => song.songbookId === self.id);
    },
  }))
  .actions(self => ({}));
