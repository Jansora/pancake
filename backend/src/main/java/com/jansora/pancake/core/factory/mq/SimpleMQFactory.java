package com.jansora.pancake.core.factory.mq;

import com.jansora.pancake.core.exception.BaseAppException;

public interface SimpleMQFactory {

    public boolean send(String topic, String tags, String message) throws BaseAppException;

}
