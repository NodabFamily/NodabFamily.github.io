import {
    POST_FAMILY_URL,
    UPDATE_FAMILY_INFO_URL,
    GET_FAMILY_URL,
    DELETE_FAMILY_URL,
    PUT_FAMILY_URL
} from "../../common/Constant/API";

import axios from "axios";
import { GET_HEADER_OPTION } from "../../common/Constant/API";

// 가족 참여 성공시에 유저 정보 업데이트
export const updateFamilyInfo = async (
    familyId, body
) => {
    const {data} = await axios.patch(
        UPDATE_FAMILY_INFO_URL(familyId),
        body
    );
    return data
}

// 가족 생성
export const postFamily = async (
    familyId, body
) => {
    const { data } = await axios.post(
        POST_FAMILY_URL(familyId),
        body
    );
    return data
}

// 가족 조회
export const getFamily = async (
    familyId
) => {
    const { data } = await axios.get(
        GET_FAMILY_URL(familyId),
        GET_HEADER_OPTION
    );
    return data
}

// 가족 정보 삭제
export const deleteFamily = async (
    familyId
) => {
    const { data } = await axios.delete(
        DELETE_FAMILY_URL(familyId)
    )
    return data;
}

// 가족 정보 수정
export const putFamily = async (
    familyId, body
    ) => {
        const { data } = await axios.put(
            PUT_FAMILY_URL(familyId),
            body
        );
        return data
    }