import { combineReducers } from "redux"

const boards = (boardsModel: any = {}, action: any) => {
  switch (action.type) {
    case "a":
      console.log("a")
      return {}
    default:
      return {}
  }
}

export default combineReducers({
  boards
})

// import users, { verifiedOtherUserIds } from "./users"
// import currentUser from "./currentUser"
// import currentUserId from "./currentUserId"
// import defaultPhoto from "./defaultPhoto"
// import directChat from "./directChat"
// import groupChat from "./groupChat"
// import groups from "./groups"
// import notifications from "./notifications"

// export default combineReducers({
//   currentUser,
//   currentUserId,
//   defaultPhoto,
//   directChat,
//   groupChat,
//   groups,
//   notifications,
//   users,
//   verifiedOtherUserIds,
// })
