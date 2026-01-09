function throttle(cb, delay){
    let shouldWait = false;
    return (...args) => {
        if(shouldWait) return;
        shouldWait = true;
        cb.apply(this, args);
        setTimeout(()=>{
            shouldWait = false;
        }, delay);
    };
}
const button = document.getElementById('main-btn');
const throttleBtn = document.getElementById('input-throttle');

button.addEventListener('click', throttle(() => {
    let currentValue = Number(throttleBtn.value) || 0;
    currentValue++;
    throttleBtn.value = `${currentValue}`;
}, 1000));