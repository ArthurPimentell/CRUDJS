import { randomUUID } from "node:crypto";

export class DatabaseMemory{
    #videos = new Map();


    // Set (nao aceita valores duplicados), Map (simula um objeto sendo que tem uma API)


    //entries traz o ID do vídeo

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) =>{
            const id = videoArray[0]
            const data = videoArray[1]

            return{
                id,
                ...data,
            }
        })

        .filter(video => {
            if(search){
                return video.title.includes(search)
            }

            return true
        })
    }


    create(video){
        const videoId = randomUUID();

        this.#videos.set(videoId, video);

        //UUID - UNIVERSAL UNIQUE ID
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }


}