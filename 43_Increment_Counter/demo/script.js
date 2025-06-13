const counters = document.querySelectorAll('.counter')

const observerOptions = {
    threshold: 0.5
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target
            const target = +counter.getAttribute('data-target')
            const duration = 2000 // 2秒でカウントアップ
            const step = target / (duration / 16) // 60fpsを想定

            let current = 0
            const updateCounter = () => {
                current += step
                if (current < target) {
                    counter.innerText = Math.ceil(current)
                    requestAnimationFrame(updateCounter)
                } else {
                    counter.innerText = target
                }
            }

            updateCounter()
            observer.unobserve(counter)
        }
    })
}, observerOptions)

counters.forEach(counter => {
    counter.innerText = '0'
    observer.observe(counter)
}) 