export const gerarId=() => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}