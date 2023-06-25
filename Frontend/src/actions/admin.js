import axios from 'axios'
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, BLOCK_USERS_FAIL, BLOCK_USERS_REQUEST, BLOCK_USERS_SUCCESS, LIST_USERS_FAIL, LIST_USERS_REQUEST, LIST_USERS_SUCCESS } from '../constants/admin'



export const adminLogin =  (email, password) => async (dipatch) => {
    try {
        dipatch({type: ADMIN_LOGIN_REQUEST})

            const config = {
              headers: {
                "Content-type":"application/json"
              }
            }
        
            const {data} = await axios.post('/api/admin', 
            {email, password },
            config
            )

            dipatch({type: ADMIN_LOGIN_SUCCESS, payload: data})

            localStorage.setItem("userInfo", JSON.stringify(data))
      
          } catch (error) {
            dipatch({ type: ADMIN_LOGIN_FAIL, 
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
       }
 }


 export const adminlogout = () => async(dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: ADMIN_LOGOUT})
  }


  export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: LIST_USERS_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/dashboard`, config);
  
      dispatch({
        type: LIST_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: LIST_USERS_FAIL,
        payload: message,
      });
    }
  };



  export const blockUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_USERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/block/${id}`, config);

    dispatch({
      type: BLOCK_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOCK_USERS_FAIL,
      payload: message,
    });
  }
};
  