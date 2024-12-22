import {
	reactive
} from 'vue';

const eventBus = reactive({
	events: {}
});

const EventBus = {
	// 注册事件，只允许一个函数
	on(event, callback) {
		// 如果该事件尚未注册，创建一个空的回调函数
		if (!eventBus.events[event]) {
			eventBus.events[event] = callback;
		} else {
			console.warn(`${event}事件已存在`);
		}
	},

	// 触发事件
	emit(event, data) {
		// 触发事件，执行注册的回调函数
		if (eventBus.events[event]) {
			return eventBus.events[event](data);
		}
	},

	// 注销事件
	off(event) {
		if (eventBus.events[event]) {
			delete eventBus.events[event];
		}
	}
};

export default EventBus;