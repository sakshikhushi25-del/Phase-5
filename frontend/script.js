const btn = document.getElementById("btn")
const quesInput = document.getElementById("question");
const result = document.getElementById("result");

btn.addEventListener("click", getAnswer);

async function getAnswer() {
    const question = quesInput.value.trim();
    if (!question) {
        result.textContent = "Please enter a question";
        return;
    }

    result.textContent = "Thinking..."
    btn.disabled = true;

    try {
        const response = await axios.post("/ask", {
            question: question
        })        
        result.innerHTML = marked.parse(response.data.answer);
    } catch (error) {
        console.log(error);
        if (error.response) {
            result.textContent = error.response.data.error;
        } else if (error.request) {
            result.textContent = "Unable to connect to the server";
        } else {
            result.textContent = error.message;
        }
    } finally {
        btn.disabled = false;
    }
}
