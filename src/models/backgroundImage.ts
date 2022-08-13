import AbstractModel from './abstractModel'

export interface IBackgroundImage extends AbstractModel {
	id: number
	url: string
	thumb: string
	info: {
		author: string
		authorName: string
	}
	blurHash: string  
}

export default class BackgroundImageModel extends AbstractModel implements IBackgroundImage {
	id!: number
	url!: string
	thumb!: string
	info!: {
		author: string
		authorName: string
	}
	blurHash!: string  

	defaults() {
		return {
			id: 0,
			url: '',
			thumb: '',
			info: {},
			blurHash: '',
		}
	}
}