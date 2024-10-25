import { create } from 'zustand';
let intervalId
export const useDataSensorStore = create((set) => ({
  temperature: 0,
  humidity: 0,
  light: 0,
  gas: 0,
  updateDataSensor: (data) => set(() => (data)),
}));

export const useCount = create((set) => ({
  count: 0,
  updateCount: (data) => set((stage) => {
    return {
      count: data || stage.count + 1,
    };
  }),
}));

export const useActionDeviceStore = create((set) => ({
  isOnLed: false,
  isOnAirConditioner: false,
  isOnFan: false,
  isOnLamp: false,
  updateActionDevice: (data) => set((stage) => ({
    ...stage,
    ...data
  }))
}))

export const useActionDeviceLoadingStore = create((set) => ({
  isLoadingLed: false,
  isLoadingAirConditioner: false,
  isLoadingFan: false,
  isLoadingLamp: false,
  updateActionDeviceLoading: (data) => set((stage) => ({
    ...stage,
    ...data
  }))
}))

export const useWebSocketStore = create((set, get) => ({
  socket: null,
  message: {
    temperatures: [],
    humiditys: [],
    lights: [],
    gass: [],
    times: []
  },  // Lưu trữ các tin nhắn nhận được
  isOpen: false,  // Trạng thái kết nối WebSocket
  updateDataSensorAray: (data) => {
    set((stage) => {
      const newMessage = {
        temperatures: data.map(d => d.temperature),
        humiditys: data.map(d => d.humidity),
        lights: data.map(d => d.light),
        times: data.map(d => d.createdAt),
        gass: data.map(d => d.gas)
      };
      return {
        ...stage,
        message: newMessage
      }
    })
  },
  connect: (url) => {
    const ws = new WebSocket(url);
    const updateDataSensor = useDataSensorStore.getState().updateDataSensor;
    const updateActionDevice = useActionDeviceStore.getState().updateActionDevice;
    const updateCount = useCount.getState().updateCount;

    ws.onopen = () => {
      console.log('WebSocket is open now.');
      set({ isOpen: true });
    };

    ws.onmessage = (event) => {
      const { topic, data } = JSON.parse(event.data);
      if (topic === 'sensorData') {
        updateDataSensor(data);
        set((stage) => {
          const newMessage = {
            temperatures: [...stage.message.temperatures, data.temperature].slice(-10),
            humiditys: [...stage.message.humiditys, data.humidity].slice(-10),
            lights: [...stage.message.lights, data.light].slice(-10),
            times: [...stage.message.times, data.createdAt].slice(-10),
            gass: [...stage.message.gass, data.gas].slice(-10),
          };
          return {
            ...stage,
            message: newMessage
          }
        })
      }

      if (topic === 'warning') {
        if (data === 'on') {
          setTimeout(() => {
            intervalId = setInterval(() => {
              const { isOnLamp } = useActionDeviceStore.getState();
              updateActionDevice({
                isOnLamp: !isOnLamp
              });
            }, 200);
          }, 1700); 
        }else if (data === 'off') {
          clearInterval(intervalId)
          updateActionDevice({
            isOnLamp: false
          })
        }
      }

      if (data.gas > 800) updateCount();

      if (topic === 'ledOk') {
        const { updateActionDeviceLoading, isLoadingLed } = useActionDeviceLoadingStore.getState();

        updateActionDeviceLoading({
          isLoadingLed: !isLoadingLed,
        })
        updateActionDevice({ isOnLed: data === 'on' });
      }
      if (topic === 'fanOk') {
        const { updateActionDeviceLoading, isLoadingFan } = useActionDeviceLoadingStore.getState();
        updateActionDeviceLoading({
          isLoadingFan: !isLoadingFan,
        })
        updateActionDevice({ isOnFan: data === 'on' });
      }
      if (topic === 'airConditionerOk') {
        const { updateActionDeviceLoading, isLoadingAirConditioner, } = useActionDeviceLoadingStore.getState();

        updateActionDeviceLoading({
          isLoadingAirConditioner: !isLoadingAirConditioner,
        })
        updateActionDevice({ isOnAirConditioner: data === 'on' });
      }
      if (topic === 'lampOk') {
        const { updateActionDeviceLoading, isLoadingLamp } = useActionDeviceLoadingStore.getState();

        updateActionDeviceLoading({
          isLoadingLamp: !isLoadingLamp,
        })
        updateActionDevice({ isOnLamp: data === 'on' });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed now.');
      set({ isOpen: false });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    set({ socket: ws });
  },
  sendMessage: (message) => {
    const socket = get().socket;
    const isOpen = get().isOpen;

    if (socket && isOpen) {
      socket.send(JSON.stringify(message));  // Gửi tin nhắn qua WebSocket
    } else {
      console.error('WebSocket is not open.');
    }
  },
  closeConnection: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();  // Đóng kết nối WebSocket
    }
  },
}));