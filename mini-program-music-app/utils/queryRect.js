export default function (selector) {
  return new Promise((resolve, rejct) => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(res=>{
		resolve(res)
	});
  });
}
