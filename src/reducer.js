// reducer function handle operation for photos

export function photosReducer(state , action){
    const {payload} = action
    
    switch (action.type) {
        case 'ADD_PHOTOS':
            return{
                photos : [payload , ...state.photos]
            }
        case 'SHOW_PHOTOS':
            return{
                photos : [...payload]
            }
        case 'UPDATE_PHOTO':
            const updatedData =  state.photos;
            return{
               photos :  updatedData,
            }
    
        default:
            return state;
    }
}