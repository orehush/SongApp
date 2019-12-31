import {resolveIdentifier, types, getParent} from 'mobx-state-tree';
import Song from 'modules/song/models/Song';

export default types
  .model('History', {
    _songs: types.array(types.number),
  })
  .views(self => ({
    get songs() {
      const parent = getParent(self, 2);
      return self._songs.map(songId => {
        return resolveIdentifier(Song, parent.songs, songId);
      });
    },
  }))
  .actions(self => ({
    track(song) {
      self._songs.unshift(song.id);
    },
  }))
  .create();
