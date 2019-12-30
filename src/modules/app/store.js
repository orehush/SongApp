import {types, flow} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Song from 'modules/song/models/Song';
import Songbook from 'modules/songbook/models/Songbook';
import Settings from './models/Settings';
import History from './models/History';

const store = types
  .model('AppStore', {
    history: History,
    settings: Settings,
    randomSong: types.maybeNull(Song),

    _songs: types.array(Song),
    _songbooks: types.array(Songbook),
  })
  .volatile(() => ({
    rehydrated: false,
  }))
  .views(self => ({
    get songs() {
      return self._songs;
    },
    get bookmarks() {
      return self._songs.filter(song => song.isBookmarked);
    },
    get songbooks() {
      return self._songbooks;
    },
  }))
  .actions(self => ({
    chooseRandom() {
      self.randomSong =
        self._songs[Math.floor(Math.random() * self._songs.length)];
    },

    rehydrate: flow(function*() {
      yield persist('mainStore', self, {
        storage: AsyncStorage,
      });
      self.rehydrated = true;
    }),

    afterCreate() {
      self.rehydrate();
    },
  }))
  .create();

export default store;
