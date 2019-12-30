import {resolveIdentifier, types, getParent} from 'mobx-state-tree';
import Song from 'modules/song/models/Song';

export default types
  .model('History', {
    songs: types.array(Song),
  })
  .views(self => ({
    get all() {
      const parent = getParent(self, 2);
      return self.songs.map(songId => {
        return resolveIdentifier(Song, parent.songs, songId);
      });
    },
  }))
  .actions(self => ({
    track(song) {
      self.songs.unshift(song.id);
    },
  }))
  .create();
