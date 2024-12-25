const setBottomNavigationBarColor = (bcg) => {
	var Color = plus.android.importClass("android.graphics.Color");
	plus.android.importClass("android.view.Window");
	var mainActivity = plus.android.runtimeMainActivity();
	var window_android = mainActivity.getWindow();
	window_android.setNavigationBarColor(Color.parseColor(bcg));
}
export default setBottomNavigationBarColor