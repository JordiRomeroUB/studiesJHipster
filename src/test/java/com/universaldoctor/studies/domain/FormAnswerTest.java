package com.universaldoctor.studies.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.universaldoctor.studies.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FormAnswerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormAnswer.class);
        FormAnswer formAnswer1 = new FormAnswer();
        formAnswer1.setId("id1");
        FormAnswer formAnswer2 = new FormAnswer();
        formAnswer2.setId(formAnswer1.getId());
        assertThat(formAnswer1).isEqualTo(formAnswer2);
        formAnswer2.setId("id2");
        assertThat(formAnswer1).isNotEqualTo(formAnswer2);
        formAnswer1.setId(null);
        assertThat(formAnswer1).isNotEqualTo(formAnswer2);
    }
}
