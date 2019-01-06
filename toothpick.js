const L = 30

class Toothpick {
    constructor(x, y, theta) {
        this.p1 = new Point(x, y)
        this.theta = theta

        const x2 = this.p1.x + L * cos(theta * PI / 180)
        const y2 = this.p1.y - L * sin(theta * PI / 180)
        this.p2 = new Point(x2, y2)

        this.p1.isAvailable = false

        this.isNew = true
    }

    draw() {
        noFill()
        if (this.isNew) {
            stroke(150, 0, 150)
        } else {
            stroke(0)
        }
        strokeWeight(2)

        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
    }

    equal(other) {
        return (this.p1.equal(other.p1) && this.p2.equal(other.p2)) ||
            (this.p1.equal(other.p2) && this.p2.equal(other.p1))
    }
}