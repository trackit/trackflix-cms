export const readFile = (file: File) => {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size (adjust as needed)
    const reader = new FileReader();
    const chunks : (string | ArrayBuffer)[] = [] ;
    let offset = 0;

    reader.onload = (event) => {
    if (event.target!.error) {
        console.error("Error reading file:", event.target!.error);
        return;
    }

    const chunk = event.target!.result;
    if (chunk)
        chunks.push(chunk); // Store the chunk

    offset += event.loaded;
    if (offset < file.size) {
        readNextChunk();
        console.log("loading next chunk, offset:", offset)
    } else {
        const fullFile = new Blob(chunks, { type: file.type });
        console.log("Complete file loaded:", fullFile);
    }
    };

    function readNextChunk() {
    const blob = file.slice(offset, offset + CHUNK_SIZE);
    reader.readAsArrayBuffer(blob);
    }

    readNextChunk();
}