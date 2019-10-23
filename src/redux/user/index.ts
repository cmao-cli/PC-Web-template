import { createModel, Raw, Action } from 'rdx-model';
enum Gender {
  Male = 'Male',
  Female = 'Female'
}
export type UserState = {
  firstName:string;
  lastName:string
  gender:Gender
  reservationId:number;
}
export const default_user = {
  firstName: '',
  lastName:'',
  gender: Gender.Male,
  reservationId: null
};

export const user_model = createModel({
  state:default_user,
  reducers: {
    'user/fetch': {
      name: Raw('fetchUser'),
    },
    'user/update': {
      name: Raw('updateUser'),
      reducer: (state:UserState, action:Action<Partial<UserState>>) : UserState => {
        return { ...state, ...action.payload };
      },
    },
  }
});

export const { fetchUser, updateUser } = user_model.actions;

export const selectUserName = (state:UserState) => {
  let userTitle;
  if (state.gender === Gender.Male) {
    userTitle = "Mr.";
  } else {
    userTitle = "Miss";
  }

  return `${userTitle} ${state.firstName} ${state.lastName}`;
}