import type { DirectiveBinding } from "vue"

const clickHoldDirective = (el: Element, binding: DirectiveBinding) => {

    let holdTimeout: number | undefined = undefined
        
    function setHoldEvent(): void {
        holdTimeout = setTimeout(() => {
            if (binding.instance) {
                binding.instance.$emit('hold', { data: binding.value })
            }
            holdTimeout = undefined
        }, 300)
    }
    
    function cancelHold(): void {
        clearTimeout(holdTimeout)
        holdTimeout = undefined
    }

    function clickEvent(): void {
        if (holdTimeout) {
            cancelHold()
            if (binding.instance) {
                binding.instance.$emit('click-default', { data: binding.value })
            }
        }
    }

    el.addEventListener('mousedown', setHoldEvent)
    el.addEventListener('touchstart', setHoldEvent)
    el.addEventListener('mouseup', clickEvent)
    el.addEventListener('touchend', clickEvent)
    el.addEventListener('mouseout', cancelHold)
}

export default clickHoldDirective