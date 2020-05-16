import { observable, action } from "mobx";
import { fetchAPI } from "@/utils";

class AdminStore {
  @action.bound
  getCheckList() {
    return fetchAPI("http://127.0.0.1:3000/admin/checkList", {
      method: "GET",
    })
      .then((res) => {
        if (res.code) {
          const { data } = res;
          return data;
        }
        return null;
      })
      .catch((e) => {
        alert("网络错误");
        Promise.reject();
      });
	}
	@action.bound
	acceptInvitation(params) {
		return fetchAPI("http://127.0.0.1:3000/admin/accept", {
			method: 'POST',
			data: params
		})
		.then((res) => {
			alert(res.message);
			if (res.code) {
				return res;
			}
			return null;
		})
		.catch((e) => {
			alert("网络错误");
			Promise.reject();
		});
	}
	@action.bound
	rejectInvitation(params) {
		return fetchAPI("http://127.0.0.1:3000/admin/reject", {
			method: 'POST',
			data: params
		})
		.then((res) => {
			alert(res.message);
			if (res.code) {
				return res;
			}
			return null;
		})
		.catch((e) => {
			alert("网络错误");
			Promise.reject();
		});
	}
}

export default new AdminStore();
