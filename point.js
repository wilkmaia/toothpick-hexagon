const EPSILON = 0.1

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.isAvailable = true
    }

    equal(other) {
        const deltaX = this.x - other.x
        const deltaY = this.y - other.y

        const distance = sqrt(deltaX*deltaX + deltaY*deltaY)

        return distance < EPSILON
    }
}