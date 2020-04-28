const initialState = {
    email : "polo3129@gmail.com",
    jwt : "90ojjwu78sjwnjwiasiw"
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                ...action.data
            }

        default:
            return state
    }
}
export default users
