import { SET_EVENT_TITLE, SET_ARTIST_TITLE } from './actionType';

const setEventTitle = (title) => {
  return {
    type: SET_EVENT_TITLE,
    payload: title
  }
}

const setArtistTitle = (title) => {
  return {
    type: SET_ARTIST_TITLE,
    payload: title
  }
}

export default {setEventTitle, setArtistTitle}