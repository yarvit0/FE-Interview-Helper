function debounce(cb, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args);
        }, delay);
    };
}
const button = document.getElementById('main-btn');
const debounceBtn = document.getElementById('input-debounce');
let count = 0;
   
const debouncedFunction = debounce(() => {
        count++;
        debounceBtn.value = `${count}`;
}, 1000);

button.addEventListener('click', () => {
    debouncedFunction();
});
