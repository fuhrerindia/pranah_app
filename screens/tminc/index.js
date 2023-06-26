import React from 'react';
import {ScrollView, View} from 'react-native';

function TMINCList(obj){
    /*
        ATTRIBUTES
        1. data
        2. renderItem

        3. onEnd
        4. style
        5. 
    */

    let data = obj.data;
    let element = obj.renderItem;
    
    if (typeof data === "object"){
        if (element !== undefined){
            if (typeof element !== "function"){
                console.warn("Try defining a Function instead of JSX directly in `renderItem` parameter.");
            }
    }else{
        console.error("No function or JSX item is passed in `renderItem` parameter.");
    }
    }else{
        console.error("You need to provide an Array as data to be added into list.");
    }
        return(
            <ScrollView
                scrollToEnd={obj.onEnd !== undefined ? obj.onEnd : null}
                style={obj.style !== undefined ? obj.style : null}
            >
                    {
                    data.map(function(item, index){
                        <View style={obj.elementStyle !== undefined ? obj.elementStyle : null}>
                            {
                                function(){
                                    return(
                                    element(index, item)
                                    );
                                }
                            }
                        </View>
                    })
                    }
            </ScrollView>
            );
}

export { TMINCList };