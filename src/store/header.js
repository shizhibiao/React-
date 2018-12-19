let breadcrumbItem = {};

export default function headerRedux(state = breadcrumbItem, action) {
    if (action.type === 'breadcrumArr') {
        return Object.assign({}, state, action.value);
    }
    else {
        return state;
    }
}