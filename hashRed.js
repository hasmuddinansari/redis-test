const Redis = require("ioredis");
const redis = new Redis()
const classKey = 'data'
const { set } = require('lodash')


const dataStore = {
    name: "Hasmuddin Ansari",
    class: "12",
    list: [1, 2, 3, 4],
    report: {
        login: null,
    }
}

Object.entries(dataStore).forEach(([key, value])=>{
    redis.hset(key, mapping = value)
})


const setData = async (data) => {
    Object.entries(data).forEach(([key, value]) => {
        redis.hset(key, None, None, value)
    })
}

const createPromise = (data) => {
    return (time = 0) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await setData(data)
                resolve(newStore)
            }, time)
        })
    }

}
const p1 = createPromise({ name: "Ayaan" });
const p2 = createPromise({
    report: {
        login: new Date()
    }
})

// Promise.all([p1(), p2()])

const resultCheck = () => {
    setTimeout(async () => {
        try {
            const olderData = await redis.hgetall("report")
            // const res = JSON.parse(olderData);
            console.log(olderData)
        } catch (e) {
            console.log(e)
        }
    }, 1000)
}
resultCheck()