package act.graph.controller;

/**
 * Created by wave on 16-8-16.
 */

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/easyQA")
public class TalkboxController {


    @RequestMapping(value = "/talk.do", method = RequestMethod.GET, produces="text/html;charset=UTF-8")
    @ResponseBody
    public String talkToMe(String question) throws Exception {
        if (question != null) question = new String(question.getBytes("iso-8859-1"),"UTF-8");
        return new Gson().toJson(question);
    }

}

