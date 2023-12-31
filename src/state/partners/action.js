const ActionType = {
    GET_PARTNERS: 'GET_PARTNERS',
}

function GetPartnersActions(medpart = [], sponsor = []) {
    return {
        type: ActionType.GET_PARTNERS,
        payload: {
            partners: { medpart, sponsor }
        }
    }
}


export { ActionType, GetPartnersActions }