const toothpicks = []
let iter = 0

const expectedNumbers = [0, 1, 5, 13, 27, 43, 57, 81, 119, 151, 165, 189, 235, 299, 353, 409, 495, 559, 573, 597, 643, 707, 769, 849, 975, 1119, 1205, 1261, 1371, 1539, 1697, 1841, 2039, 2167, 2181, 2205, 2251, 2315, 2377, 2457, 2583, 2727, 2821, 2901, 3043, 3267, 3505, 3729, 4015]

function setup() {
    createCanvas(800, 800)
    background(150)

    const toothpick = new Toothpick(width/2 - L/2, height/2, 0)
    toothpick.p1.isAvailable = true
    toothpicks.push(toothpick)

    noLoop()
}

function mouseClicked() {
    draw()
}

function runFirstIteration(t) {
    const t1 = new Toothpick(t.p1.x, t.p1.y, 120)
    const t2 = new Toothpick(t.p1.x, t.p1.y, -120)
    const t3 = new Toothpick(t.p2.x, t.p2.y, 60)
    const t4 = new Toothpick(t.p2.x, t.p2.y, -60)

    toothpicks.push(t1)
    toothpicks.push(t2)
    toothpicks.push(t3)
    toothpicks.push(t4)

    t.p1.isAvailable = false
    t.p2.isAvailable = false
}

function draw() {
    console.log(`Geração: ${++iter} | Palitos: ${toothpicks.length} | Esperados: ${expectedNumbers[iter]}`)

    const newToothpicks = []

    for (let i = toothpicks.length - 1; i >= 0; --i) {
        const toothpick = toothpicks[i]

        toothpick.draw()
        toothpick.isNew = false

        if (toothpicks.length === 1) {
            runFirstIteration(toothpick)
            continue
        }

        if (toothpick.p2.isAvailable) {
            const t1 = new Toothpick(
                toothpick.p2.x,
                toothpick.p2.y,
                toothpick.theta + 60
            )
            const t2 = new Toothpick(
                toothpick.p2.x,
                toothpick.p2.y,
                toothpick.theta - 60
            )

            let isT1Ok = true
            let isT2Ok = true

            for (let j = newToothpicks.length - 1; j >= 0; --j) {
                const otherToothpick = newToothpicks[j]

                if (t1.equal(otherToothpick)) {
                    isT1Ok = false
                }

                if (t2.equal(otherToothpick)) {
                    isT2Ok = false
                }

                if (t1.p2.equal(otherToothpick.p2)) {
                    t1.p2.isAvailable = false
                    otherToothpick.p2.isAvailable = false
                }

                if (t2.p2.equal(otherToothpick.p2)) {
                    t2.p2.isAvailable = false
                    otherToothpick.p2.isAvailable = false
                }
            }

            for (let j = toothpicks.length - 1; j >= 0; --j) {
                const otherToothpick = toothpicks[j]

                if (t1.p2.equal(otherToothpick.p2)) {
                    t1.p2.isAvailable = false
                }

                if (t2.p2.equal(otherToothpick.p2)) {
                    t2.p2.isAvailable = false
                }
            }

            if (isT1Ok) {
                toothpicks.push(t1)
                newToothpicks.push(t1)
            }

            if (isT2Ok) {
                toothpicks.push(t2)
                newToothpicks.push(t2)
            }
        }

        toothpick.p2.isAvailable = false
    }
}