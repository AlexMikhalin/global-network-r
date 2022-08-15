
export type PostType ={
    id: number,
    message: string,
    likesCount: number
}

export type PhotosType ={
    small: string | null,
    large: string | null,
}

export type ProfileType ={
    userId: number,
    lookingForAJob: string,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainlink: string,
}

export type UserType = { 
    id: number,
    name: string,
    photos: PhotosType
}
