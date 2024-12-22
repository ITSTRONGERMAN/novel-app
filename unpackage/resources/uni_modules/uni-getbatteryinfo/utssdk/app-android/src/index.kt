@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER")
package uts.sdk.modules.uniGetbatteryinfo;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
open class GetBatteryInfoSuccess (
    @JsonNotNull
    open var errMsg: String,
    @JsonNotNull
    open var level: Number,
    @JsonNotNull
    open var isCharging: Boolean = false,
) : UTSObject()
open class GetBatteryInfoOptions (
    open var success: ((res: GetBatteryInfoSuccess) -> Unit)? = null,
    open var fail: ((res: UniError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class GetBatteryInfoResult (
    @JsonNotNull
    open var level: Number,
    @JsonNotNull
    open var isCharging: Boolean = false,
) : UTSObject()
typealias GetBatteryInfoErrorCode = Number;
interface GetBatteryInfoFail : IUniError {
    override var errCode: GetBatteryInfoErrorCode
}
typealias GetBatteryInfo = (options: GetBatteryInfoOptions) -> Unit;
typealias GetBatteryInfoSync = () -> GetBatteryInfoResult;
val UniErrorSubject = "uni-getBatteryInfo";
val UniErrors: Map<GetBatteryInfoErrorCode, String> = Map(utsArrayOf(
    utsArrayOf(
        1001,
        "getBatteryInfo:fail getAppContext is null"
    ),
    utsArrayOf(
        1002,
        "getBatteryInfo:fail not support"
    )
));
open class GetBatteryInfoFailImpl : UniError, GetBatteryInfoFail {
    override var errCode: GetBatteryInfoErrorCode;
    constructor(errCode: GetBatteryInfoErrorCode) : super() {
        this.errSubject = UniErrorSubject;
        this.errCode = errCode;
        this.errMsg = UniErrors[errCode] ?: "";
    }
}
val getBatteryInfo: GetBatteryInfo = fun(options: GetBatteryInfoOptions) {
    val context = UTSAndroid.getAppContext();
    if (context != null) {
        val manager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager;
        val level = manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        var ifilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        var batteryStatus = context.registerReceiver(null, ifilter);
        var status = batteryStatus?.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        var isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;
        val res = GetBatteryInfoSuccess(errMsg = "getBatteryInfo:ok", level = level, isCharging = isCharging);
        options.success?.invoke(res);
        options.complete?.invoke(res);
    } else {
        var res = GetBatteryInfoFailImpl(1001);
        options.fail?.invoke(res);
        options.complete?.invoke(res);
    }
}
;
val getBatteryInfoSync: GetBatteryInfoSync = fun(): GetBatteryInfoResult {
    val context = UTSAndroid.getAppContext();
    if (context != null) {
        val manager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager;
        val level = manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        var ifilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        var batteryStatus = context.registerReceiver(null, ifilter);
        var status = batteryStatus?.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        var isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;
        val res = GetBatteryInfoResult(level = level, isCharging = isCharging);
        return res;
    } else {
        val res = GetBatteryInfoResult(level = -1, isCharging = false);
        return res;
    }
}
;
open class GetBatteryInfoOptionsJSONObject : UTSJSONObject() {
    open var success: UTSCallback? = null;
    open var fail: UTSCallback? = null;
    open var complete: UTSCallback? = null;
}
fun getBatteryInfoByJs(options: GetBatteryInfoOptionsJSONObject): Unit {
    return getBatteryInfo(GetBatteryInfoOptions(success = fun(res: GetBatteryInfoSuccess): Unit {
        options.success?.invoke(res);
    }
    , fail = fun(res: UniError): Unit {
        options.fail?.invoke(res);
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res);
    }
    ));
}
fun getBatteryInfoSyncByJs(): GetBatteryInfoResult {
    return getBatteryInfoSync();
}
