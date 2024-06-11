import { auth, db } from '../firebase'
import { ref, set, get, push, update, remove, orderByChild, query, equalTo } from 'firebase/database'

export const readData = async path => {
  return get(ref(db, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return 0
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export const handleLogOut = (navigate) => {
  auth
    .signOut()
    .then(() => {
      sessionStorage.clear()
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
    })
}

export const submitLogin = async (user, navigate, setMessage) => {
  const { email, password } = user
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      sessionStorage.setItem('userID', user.uid)
      document.dispatchEvent(new CustomEvent("auth", {  detail: { loggedIn: true } }))
      if (user) navigate('/profile')
    })
    .catch(({ message }) => {
      setMessage(message.split(":")[1])
    })
}

export const submitRegister = async ({ username, email, password }, navigate, setMessage) => {
  const userData = {
    username,
    email
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      set(ref(db, `users/${user.uid}`), userData)
      submitLogin({ email, password}, navigate, setMessage)
      navigate('/profile')
    })
    .catch(err => {
      setMessage(err.message.split(':')[1])
    })
}

export const updateData = async (path, data) => {
  const reference = ref(db, path)
  return update(reference, data)
}

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const deleteData = path => {
  const reference = ref(db, path)
  return remove(reference)
}

export const getUserByID = async userID => {
    const userRef = ref(db, `users/${userID}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log('User not found')
      return null
    }
}

export const getTagByID = async tagID => {
  const tagRef = ref(db, `tags/${tagID}`)
  const snapshot = await get(tagRef)
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    console.log('Tag not found')
    return null
  }
}

export const getCommentsByGameID = async gameID => {
  const commentsRef = ref(db, 'commentaires')
  const commentsQuery = query(commentsRef, orderByChild('gameID'), equalTo(gameID))
  const snapshot = await get(commentsQuery)
  if (snapshot.exists()) {
    const commentsObject = snapshot.val()
    const commentsArray = Object.keys(commentsObject).map(key => commentsObject[key])
    return commentsArray
  } else {
    return []
  }
}

export const createVote = async (game, userID, voteType) => {
  const vote = {
    gameID: game.key,
    userID: userID,
    voteType: voteType
  }

  const score = voteType ? game.score + 1 : game.score - 1
  pushData('votes', vote);
  updateData(`games/${game.key}`, {score: score});

  return true;
}

export const getUserVote = async (game, userID) => {
  if (userID === null) {
    return null;
  }

  const votesRef = ref(db, 'votes');
  const userVotesQuery = query(votesRef, orderByChild('userID'), equalTo(userID));

  const snapshot = await get(userVotesQuery);
  if (snapshot.exists()) {
    const votes = snapshot.val();
    for (let key in votes) {
      if (votes[key].gameID === game.key) {
        return votes[key];
      }
    }
  } else {
    return null;
  }
}