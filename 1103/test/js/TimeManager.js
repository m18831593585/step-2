export default class TimeManager {
    static _instance
    static list = new Set()
    static animationId

    static getInstance() {
        if (!this._instance) {
            this._instance = new TimeManager()
        }
        return this._instance
    }

    add(item) {
        if (TimeManager.list.has(item)) return
        TimeManager.list.add(item)
        if (!TimeManager.animationId) TimeManager.animation()
    }

    remove(item) {
        if (!TimeManager.list.has(item)) return
        TimeManager.list.delete(item)
        if (TimeManager.list.size===0 && TimeManager.animationId) cancelAnimationFrame(TimeManager.animationId)
    }

    static update() {
        TimeManager.list.forEach(item => {
            item.update()
        })
    }

    static animation() {
        TimeManager.animationId = requestAnimationFrame(TimeManager.animation)
        TimeManager.update()
    }
}