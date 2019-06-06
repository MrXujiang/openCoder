export default {
    // 同步
    add(context) {
        context.commit('add', paylod.num);
    },
    // 异步
    asyncAdd(context, paylod) {
        setTimeout(() => {
            context.commit('add', paylod.num);
        }, 1000);
    },
};