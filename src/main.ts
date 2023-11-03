import './style.css'

document.addEventListener('DOMContentLoaded', function () {
    if (!window.top) {
        return
    }

    window.top.postMessage(
        {
            type: 'getRCPayload',
        },
        '*'
    )

    window.onmessage = (event) => {
        const data = event.data
        if (data.type === 'RCPayload') {
            initWithRCPayload(data.payload)
        }
    }

    function initWithRCPayload(rcPayload: any): void {
        let uniqueNames = new Set(
            rcPayload.hub_visits.map((visit: any) => visit.person.name)
        )
        const out: string[] = []
        uniqueNames.forEach((name) => {
            out.push(
                `<div style="${`font-size:${
                    1 + Math.max(0.2, Math.random() * 3 - 1.5)
                }rem;transform:rotate(${
                    Math.random() * 40 - 20
                }deg);position:absolute;top: ${Math.random() * 100}vh; left: ${
                    Math.random() * 100
                }vw;}
                `}">${name}</div>`
            )
        })
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = out.join('')
    }
})
