export class BaseTypeComponent {
    _type:string = '';
    isArtist():   boolean { return this._type === 'artist' };
    isAlbum():    boolean { return this._type === 'album' };
    isTrack():    boolean { return this._type === 'track' };
    isPlaylist(): boolean { return this._type === 'playlist' };

    get type(): string {
        return this._type;
    }

    set type(type:string){
        this._type = type;
    }

    get capitalizedType(): string {
        if (this.type && this.type.length >=1){
            return this.type.charAt(0).toUpperCase() + this.type.slice(1);
        }
        else {
            return this.type;
        }
    };

    get uncapitalizedType(): string {
        if (this.type && this.type.length >= 1) {
            return this.type.charAt(0).toLowerCase() + this.type.slice(1); 
        }
        else {
            return this.type;
        }
    };
}