/// <reference types="vite/client" />
declare namespace API{


    type NotificationVO = {
        content?: string;
        endTime?: string;
        startTime?: string;
        title?: string;
        type?: string;
      };

    type BaseResponseNotificationVO_ = {
        code?: number;
        data?: NotificationVO;
        message?: string;
      };
    
    type getNotificatiionVOUsingGETParams = {
        /** domain */
        domain: string;
      };
       
}


