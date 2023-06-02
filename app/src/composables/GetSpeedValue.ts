type Speed = {
    base: number,
    bonus?: number,
    temporalModifier?: number
}

export default function getSpeedValue(speed: Speed): number {
    let value: number = speed.base
    if (speed.bonus) {
        value += speed.bonus
    }

    if (speed.temporalModifier) {
        value += speed.temporalModifier
    }

    return value
}