const getBottomNavigationBarColor = () => {
	var Color = plus.android.importClass("android.graphics.Color");
	plus.android.importClass("android.view.Window");
	var mainActivity = plus.android.runtimeMainActivity();
	var window_android = mainActivity.getWindow();
	return window_android.getNavigationBarColor()
}
export default getBottomNavigationBarColor