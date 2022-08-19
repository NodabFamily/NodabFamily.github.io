import {
    GET_ALBUM_DETAIL_URL,
    GET_ALBUM_URL,
    DELETE_ALBUM_URL,
    PUT_ALBUM_URL,
    CREATE_ALBUM_URL,
    POST_LIKE_URL,
    DELETE_LIKE_URL,
    POST_COMMENT_URL,
    DELETE_COMMNET_URL,
    UPDATE_COMMNET_URL
} from "../../common/Constant/API";

import axios from "axios";
import { GET_HEADER_OPTION } from "../../common/Constant/API";

// 앨범 생성
export const postAlbum = async (
    body, familyId
) => {
   const { data } = await axios.post(
    CREATE_ALBUM_URL(familyId),
    body,
   );
   return data
}
// 앨범 수정
export const updateAlbum = async (
    body, familyId, albumId
) => {
    const { data } = await axios.update(
        PUT_ALBUM_URL(familyId, albumId),
        body
    );
    return data
}
// 앨범 상세 조회
export const getAlbumDetail = async (familyId, albumId) => {
    const { data } = await axios.get(
        GET_ALBUM_DETAIL_URL(familyId, albumId),
        GET_HEADER_OPTION
    );
    return data
}

// 앨범 전체 조회
export const getAlbum = async (
    familyId
    ) => {
    const { data } = await axios.get(
        GET_ALBUM_URL(familyId),
        GET_HEADER_OPTION
    );
    return data
}

// 앨범 삭제
export const deleteAlbum = async (
    familyId, albumId
) => {
    const { data } = await axios.delete(
        DELETE_ALBUM_URL(familyId, albumId)
    );
    return data
}

// 좋아요
export const postLike = async (
    familyId, albumId, photoId
) => {
    const { data } = await axios.post(
        POST_LIKE_URL(familyId, albumId, photoId)
    );
    return data
}

// 좋아요 취소
export const deleteLike = async (
    familyId, albumId, photoId
) => {
    const { data } = await axios.delete(
        DELETE_LIKE_URL(familyId, albumId, photoId)
    )
    return data
}

// 댓글 작성
export const postComment = async (
    body 
) => {
    const { data } = await axios.post(
        POST_COMMENT_URL
    );
    return data
}
// 댓글 수정

export const updateComment = async (
    familyId, photoId, commentId, body
) => {
    const { data } = await axios.put(
        UPDATE_COMMNET_URL(familyId, photoId, commentId),
        body
    );
    return data
}

// 댓글 삭제
export const deleteComment = async (
    familyId, albumId
) => {
    const { data } = await axios.delete(
        DELETE_COMMNET_URL(familyId, albumId)
    );
    return data
}
