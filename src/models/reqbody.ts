export default class RequestDto {
    author: string;
    title: string;
    constructor(author: string, title: string) {
        this.author = author;
        this.title = title;
    }
    getAuthor(): string {
        return this.author;
    }
    getTitle(): string {
        return this.title;
    }
}
