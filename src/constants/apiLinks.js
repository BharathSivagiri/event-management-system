export const API_ENDPOINTS = {
    LOGIN : 'http://localhost:8080/ems/api/auth',
    ADD_EVENT : 'http://localhost:8080/ems/events/add',
    UPDATE_EVENT : 'http://localhost:8080/ems/events/update',
    DELETE_EVENT : 'http://localhost:8080/ems/events/delete/:eventId',
    VIEW_EVENTS : 'http://localhost:8080/ems/events/view',
    VIEW_REGISTRATIONS : 'http://localhost:8080/ems/events/users/view-participants',

    REG_FOR_EVENT : 'http://localhost:8080/ems/events/registration',
    CANCEL_REG_EVENT : 'http://localhost:8080/ems/events/registration/cancel'

}