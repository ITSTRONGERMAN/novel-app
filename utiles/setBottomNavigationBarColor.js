const setBottomNavigationBarColor = (bcg) => {
	var Color = plus.android.importClass("android.graphics.Color");
	plus.android.importClass("android.view.Window");
	var mainActivity = plus.android.runtimeMainActivity();
	var window_android = mainActivity.getWindow();
	if (typeof bcg === 'string') window_android.setNavigationBarColor(Color.parseColor(bcg));
	else if (typeof bcg === 'number') window_android.setNavigationBarColor(bcg)
}
export default setBottomNavigationBarColor