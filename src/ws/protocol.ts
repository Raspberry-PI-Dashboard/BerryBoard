// protocol.ts

// =============================================================================
// Common
// =============================================================================

export type WebSocketRequest =
  | PingRequest
  | InfoRequest
  | PinReadRequest
  | PinSetRequest
  | PinToggleRequest
  | PinPwmSetRequest
  | PinPwmStopRequest
  | I2CRequest
  | ShellRequest;

export type WebSocketMessage =
  | WebSocketResponse
  | ConnectedMessage
  | InfoResponse
  | ServerShutdownMessage
  | ErrorMessage;

export type WebSocketResponse =
  | PongResponse
  | InfoResponse
  | PinReadResponse
  | PinSetResponse
  | PinToggleResponse
  | PinPwmResponse
  | I2CResponse
  | ShellResponse;

// =============================================================================
// Gateway
// =============================================================================

export type ConnectedMessage = {
  type: "connected";
  timestamp: string;
  message: string;
};

export type ServerShutdownMessage = {
  type: "server_shutdown";
};

export type ErrorMessage =
  | {
      type: "error";
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

// =============================================================================
// Health and connection information
// =============================================================================

export type PingRequest = {
  type: "ping";
};

export type PongResponse = {
  type: "pong";
  timestamp: string;
};

export type InfoRequest = {
  type: "info";
};

export type InfoResponse = {
  type: "info";
  connected_at: string;
};

// =============================================================================
// GPIO
// =============================================================================

export type PinAction = "set" | "toggle" | "read" | "pwm_set" | "pwm_stop";

export type PinMode = "input" | "output" | "pwm";

export type PinModeRequest = {
  type: "pin";
  action: "mode";
  pin: number;
  mode: PinMode;
};

export type PinModeResponse = {
  ok: true;
  type: "pin";
  action: "mode";
  pin: number;
  mode: PinMode;
};


export type PinSetRequest = {
  type: "pin";
  action: "set";
  pin: number;
  value: boolean;
};

export type PinToggleRequest = {
  type: "pin";
  action: "toggle";
  pin: number;
};

export type PinReadRequest = {
  type: "pin";
  action: "read";
  pin: number;
};

export type PinPwmSetRequest = {
  type: "pin";
  action: "pwm_set";
  pin: number;
  duty_cycle: number;
  frequency?: number;
};

export type PinPwmStopRequest = {
  type: "pin";
  action: "pwm_stop";
  pin: number;
};

export type PinRequest =
  | PinModeRequest
  | PinSetRequest
  | PinToggleRequest
  | PinReadRequest
  | PinPwmSetRequest
  | PinPwmStopRequest;

export type PinSetResponse = {
  ok: true;
  type: "pin";
  action: "set";
  pin: number;
  value: boolean;
};

export type PinToggleResponse = {
  ok: true;
  type: "pin";
  action: "toggle";
  pin: number;
  value: boolean;
};

export type PinReadResponse = {
  ok: true;
  type: "pin";
  action: "read";
  pin: number;
  value: boolean;
};

export type PinPwmResponse = {
  ok: true;
  type: "pin";
  action: "pwm_set" | "pwm_stop";
  pin: number;
  duty_cycle: number;
  frequency: number;
};

export type PinResponse =
  | PinModeResponse
  | PinSetResponse
  | PinToggleResponse
  | PinReadResponse
  | PinPwmResponse;

export type PinState = {
  pin: number;

  digital: {
    value: boolean;
  };

  pwm: {
    active: boolean;
    duty_cycle: number;
    frequency: number;
  };
};

// =============================================================================
// I2C
// =============================================================================

export type I2CAction =
  | "scan"
  | "read_byte"
  | "write_byte"
  | "read_register"
  | "write_register"
  | "read_block"
  | "write_block";

/**
 * Runtime range: 0x03 - 0x77.
 */
export type I2CAddress = number;

/**
 * Runtime range: 0x00 - 0xFF.
 */
export type I2CByte = number;

/**
 * Runtime range: 0x00 - 0xFF.
 */
export type I2CRegister = number;

/**
 * Runtime range: 1 - 32.
 */
export type I2CBlockLength = number;

export type I2CScanRequest = {
  type: "i2c";
  action: "scan";
};

export type I2CReadByteRequest = {
  type: "i2c";
  action: "read_byte";
  address: I2CAddress;
};

export type I2CWriteByteRequest = {
  type: "i2c";
  action: "write_byte";
  address: I2CAddress;
  value: I2CByte;
};

export type I2CReadRegisterRequest = {
  type: "i2c";
  action: "read_register";
  address: I2CAddress;
  register: I2CRegister;
};

export type I2CWriteRegisterRequest = {
  type: "i2c";
  action: "write_register";
  address: I2CAddress;
  register: I2CRegister;
  value: I2CByte;
};

export type I2CReadBlockRequest = {
  type: "i2c";
  action: "read_block";
  address: I2CAddress;
  register: I2CRegister;
  length: I2CBlockLength;
};

export type I2CWriteBlockRequest = {
  type: "i2c";
  action: "write_block";
  address: I2CAddress;
  register: I2CRegister;
  data: I2CByte[];
};

export type I2CRequest =
  | I2CScanRequest
  | I2CReadByteRequest
  | I2CWriteByteRequest
  | I2CReadRegisterRequest
  | I2CWriteRegisterRequest
  | I2CReadBlockRequest
  | I2CWriteBlockRequest;

export type I2CScanResponse = {
  ok: true;
  type: "i2c";
  action: "scan";
  bus: number;
  addresses: I2CAddress[];
};

export type I2CReadByteResponse = {
  ok: true;
  type: "i2c";
  action: "read_byte";
  bus: number;
  address: I2CAddress;
  value: I2CByte;
};

export type I2CWriteByteResponse = {
  ok: true;
  type: "i2c";
  action: "write_byte";
  bus: number;
  address: I2CAddress;
  value: I2CByte;
};

export type I2CReadRegisterResponse = {
  ok: true;
  type: "i2c";
  action: "read_register";
  bus: number;
  address: I2CAddress;
  register: I2CRegister;
  value: I2CByte;
};

export type I2CWriteRegisterResponse = {
  ok: true;
  type: "i2c";
  action: "write_register";
  bus: number;
  address: I2CAddress;
  register: I2CRegister;
  value: I2CByte;
};

export type I2CReadBlockResponse = {
  ok: true;
  type: "i2c";
  action: "read_block";
  bus: number;
  address: I2CAddress;
  register: I2CRegister;
  data: I2CByte[];
};

export type I2CWriteBlockResponse = {
  ok: true;
  type: "i2c";
  action: "write_block";
  bus: number;
  address: I2CAddress;
  register: I2CRegister;
  data: I2CByte[];
};

export type I2CResponse =
  | I2CScanResponse
  | I2CReadByteResponse
  | I2CWriteByteResponse
  | I2CReadRegisterResponse
  | I2CWriteRegisterResponse
  | I2CReadBlockResponse
  | I2CWriteBlockResponse;

export type I2CState = {
  bus: number;
  mock: boolean;
};

// =============================================================================
// Shell
// =============================================================================

export type ShellRequest =
  | {
      type: "shell_start";
    }
  | {
      type: "shell_input";
      data: string;
    };

export type ShellStartedMessage = {
  type: "shell_started";
};

export type ShellOutputMessage = {
  type: "shell_output";
  data: string;
};

export type ShellResponse = ShellOutputMessage | ShellStartedMessage;
