
export default {
    add(state, payload) {
        payload ? (state.total += payload.num) : state.total++;
    }
};