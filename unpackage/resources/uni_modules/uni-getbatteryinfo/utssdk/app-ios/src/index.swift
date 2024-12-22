import DCloudUTSFoundation;
import UIKit;
@objc(UTSSDKModulesUniGetbatteryinfoGetBatteryInfoSuccess)
@objcMembers
public class GetBatteryInfoSuccess : NSObject, UTSObject {
    public var errMsg: String!;
    public var level: NSNumber!;
    public var isCharging: Bool = false;
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key);
        }
        set {
            switch(key){
                case "errMsg":
                    self.errMsg = try! utsSubscriptCheckValue(newValue);
                case "level":
                    self.level = try! utsSubscriptCheckValue(newValue);
                case "isCharging":
                    self.isCharging = try! utsSubscriptCheckValue(newValue);
                default:
                    break;
            }
        }
    }
    public override init() {
        super.init();
    }
    public init(_ obj: UTSJSONObject) {
        self.errMsg = obj["errMsg"] as! String;
        self.level = obj["level"] as! NSNumber;
        self.isCharging = obj["isCharging"] as! Bool;
    }
}
@objc(UTSSDKModulesUniGetbatteryinfoGetBatteryInfoOptions)
@objcMembers
public class GetBatteryInfoOptions : NSObject, UTSObject {
    public var success: ((_ res: GetBatteryInfoSuccess) -> Void)?;
    public var fail: ((_ res: UniError) -> Void)?;
    public var complete: ((_ res: Any) -> Void)?;
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key);
        }
        set {
            switch(key){
                case "success":
                    self.success = try! utsSubscriptCheckValueIfPresent(newValue);
                case "fail":
                    self.fail = try! utsSubscriptCheckValueIfPresent(newValue);
                case "complete":
                    self.complete = try! utsSubscriptCheckValueIfPresent(newValue);
                default:
                    break;
            }
        }
    }
    public override init() {
        super.init();
    }
    public init(_ obj: UTSJSONObject) {
        self.success = obj["success"] as! ((_ res: GetBatteryInfoSuccess) -> Void)?;
        self.fail = obj["fail"] as! ((_ res: UniError) -> Void)?;
        self.complete = obj["complete"] as! ((_ res: Any) -> Void)?;
    }
}
@objc(UTSSDKModulesUniGetbatteryinfoGetBatteryInfoResult)
@objcMembers
public class GetBatteryInfoResult : NSObject, UTSObject {
    public var level: NSNumber!;
    public var isCharging: Bool = false;
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key);
        }
        set {
            switch(key){
                case "level":
                    self.level = try! utsSubscriptCheckValue(newValue);
                case "isCharging":
                    self.isCharging = try! utsSubscriptCheckValue(newValue);
                default:
                    break;
            }
        }
    }
    public override init() {
        super.init();
    }
    public init(_ obj: UTSJSONObject) {
        self.level = obj["level"] as! NSNumber;
        self.isCharging = obj["isCharging"] as! Bool;
    }
}
public typealias GetBatteryInfo = (_ options: GetBatteryInfoOptions) -> Void;
public typealias GetBatteryInfoSync = () -> GetBatteryInfoResult;
public var getBatteryInfo: GetBatteryInfo = {
(_ options) -> Void in
UIDevice.current.isBatteryMonitoringEnabled = true;
var res = GetBatteryInfoSuccess(UTSJSONObject([
    "errMsg": "getBatteryInfo:ok",
    "level": NSNumber(UIDevice.current.batteryLevel * 100),
    "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
]));
options.success?(res);
options.complete?(res);
};
public var getBatteryInfoSync: GetBatteryInfoSync = {
() -> GetBatteryInfoResult in
UIDevice.current.isBatteryMonitoringEnabled = true;
var res = GetBatteryInfoResult(UTSJSONObject([
    "level": NSNumber(UIDevice.current.batteryLevel * 100),
    "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
]));
return res;
};
@objc(UTSSDKModulesUniGetbatteryinfoGetBatteryInfoOptionsJSONObject)
@objcMembers
public class GetBatteryInfoOptionsJSONObject : NSObject {
    public var success: UTSCallback?;
    public var fail: UTSCallback?;
    public var complete: UTSCallback?;
}
public func getBatteryInfoByJs(_ options: GetBatteryInfoOptionsJSONObject) -> Void {
    return getBatteryInfo(GetBatteryInfoOptions(UTSJSONObject([
        "success": {
        (res: GetBatteryInfoSuccess) -> Void in
        options.success?(res);
        },
        "fail": {
        (res: UniError) -> Void in
        options.fail?(res);
        },
        "complete": {
        (res: Any) -> Void in
        options.complete?(res);
        }
    ])));
}
public func getBatteryInfoSyncByJs() -> GetBatteryInfoResult {
    return getBatteryInfoSync();
}
@objc(UTSSDKModulesUniGetbatteryinfoIndexSwift)
@objcMembers
public class UTSSDKModulesUniGetbatteryinfoIndexSwift : NSObject {
    public static func s_getBatteryInfoByJs(_ options: GetBatteryInfoOptionsJSONObject) -> Void {
        return getBatteryInfoByJs(options);
    }
    public static func s_getBatteryInfoSyncByJs() -> GetBatteryInfoResult {
        return getBatteryInfoSyncByJs();
    }
}
