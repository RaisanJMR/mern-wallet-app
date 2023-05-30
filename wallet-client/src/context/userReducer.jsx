const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        user: state.user === null,
      }
    default:
      return state
  }
}

export default UserReducer
