'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {


	const {
		method,
	} = event


	switch (method) {
		case 'get':
			return await db.collection('novel').get()
	}

	//event为客户端上传的参数
	console.log('event : ', event)

	//返回数据给客户端
	return event
};
